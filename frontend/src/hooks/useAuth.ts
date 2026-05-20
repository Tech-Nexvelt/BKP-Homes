import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import type { LoginPayload, SignupPayload, OtpPayload } from '@/types/auth.types';

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user, accessToken, isAuthenticated, setAuth, clearAuth, updateUser } = useAuthStore();
  const clearCart = useCartStore((s) => s.clearCart);
  const clearWishlist = useWishlistStore((s) => s.clear);

  // Get current user profile
  const meQuery = useQuery({
    queryKey: ['auth-me'],
    queryFn: async () => {
      if (!accessToken) return null;
      const res = await authService.me();
      return res.data.data;
    },
    enabled: !!accessToken,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginPayload) => authService.login(data),
    onSuccess: (res) => {
      const { user: userData, accessToken: token } = res.data.data;
      setAuth(userData, token);
      queryClient.setQueryData(['auth-me'], userData);
      toast.success('Welcome back, ' + userData.name);
      if (userData.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Login failed');
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupPayload) => authService.signup(data),
    onSuccess: (_, variables) => {
      toast.success('Registration successful. Verification OTP sent!');
      router.push(`/verify-otp?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Signup failed');
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (data: OtpPayload) => authService.verifyOtp(data),
    onSuccess: (res) => {
      const { user: userData, accessToken: token } = res.data.data;
      setAuth(userData, token);
      queryClient.setQueryData(['auth-me'], userData);
      toast.success('Account verified successfully!');
      router.push('/dashboard');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Verification failed');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearAuth();
      clearCart();
      clearWishlist();
      queryClient.clear();
      toast.success('Logged out successfully');
      router.push('/');
    },
    onError: () => {
      // Force logout anyway
      clearAuth();
      clearCart();
      clearWishlist();
      queryClient.clear();
      router.push('/');
    },
  });

  return {
    user,
    isAuthenticated,
    isLoadingProfile: meQuery.isLoading,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    signup: signupMutation.mutate,
    isSigningUp: signupMutation.isPending,
    verifyOtp: verifyOtpMutation.mutate,
    isVerifying: verifyOtpMutation.isPending,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    updateUser,
  };
}
