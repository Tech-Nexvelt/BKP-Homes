'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Sparkles, Upload, Ruler, FileText, CheckCircle } from 'lucide-react';
import { customFurnitureService } from '@/services/custom-furniture.service';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { toast } from 'react-hot-toast';

export function CustomFurnitureWizard() {
  const [step, setStep] = React.useState(1);
  const [roomType, setRoomType] = React.useState('Living Room');
  
  // Dimensions
  const [width, setWidth] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [depth, setDepth] = React.useState('');
  const [unit, setUnit] = React.useState('inches');

  // Materials
  const [material, setMaterial] = React.useState('Solid Teak Wood');
  const [fabric, setFabric] = React.useState('Italian Velvet');
  const [color, setColor] = React.useState('Classic Walnut Polish');
  const [finish, setFinish] = React.useState('Satin Matte');

  // Attachments
  const [photos, setPhotos] = React.useState<string[]>([]);
  const [uploading, setUploading] = React.useState(false);

  // Notes & Submission
  const [notes, setNotes] = React.useState('');
  const [budget, setBudget] = React.useState('');
  const [preferredDate, setPreferredDate] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const rooms = ['Living Room', 'Bedroom', 'Dining Room', 'Home Office', 'Outdoor / Garden', 'Accent Lobby'];
  const materials = ['Solid Teak Wood', 'Premium Mahogany', 'Royal Rosewood', 'Black Walnut', 'Macedonian Marble & Steel'];
  const fabrics = ['Italian Velvet', 'Full-Grain Leather', 'Natural Belgian Linen', 'Microfiber Suede', 'None (All Wood)'];
  const finishes = ['Satin Matte', 'High-Gloss Lacquer', 'Rustic Distressed', 'Zero-VOC Oil Rubbed', 'Natural Raw Wax'];

  const handleNext = () => setStep((s) => Math.min(s + 1, 7));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    // Simulate high-quality media asset upload
    await new Promise((r) => setTimeout(r, 1500));
    setUploading(false);
    setPhotos((p) => [...p, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600']);
    toast.success('Reference sketch/photo uploaded.');
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await customFurnitureService.create({
        roomPhotos: photos,
        referenceImages: photos,
        width: width ? parseFloat(width) : undefined,
        height: height ? parseFloat(height) : undefined,
        depth: depth ? parseFloat(depth) : undefined,
        material,
        color: `${color} (${fabric})`,
        finish,
        budget: budget ? parseFloat(budget) : undefined,
        notes: `Unit: ${unit}. Notes: ${notes}`,
        preferredDate: preferredDate ? new Date(preferredDate).toISOString() : undefined,
      });
      setStep(8); // Completed Success screen
      toast.success('Bespoke furniture request created!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Submission failed. Please log in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto p-6 md:p-8 bg-dark-card border-dark-border/80 shadow-gold relative overflow-hidden">
      
      {/* Interactive Step Header */}
      {step <= 7 && (
        <div className="flex justify-between items-center border-b border-dark-border/60 pb-5 mb-8">
          <div>
            <span className="text-[10px] font-bold text-gold tracking-widest uppercase">Bespoke Configurator</span>
            <h2 className="font-display text-xl md:text-2xl font-semibold tracking-wide text-gold-light mt-0.5">
              Step {step} of 7: {
                step === 1 ? 'Design Category' :
                step === 2 ? 'Master Dimensions' :
                step === 3 ? 'Timber Selection' :
                step === 4 ? 'Upholstery Fabric' :
                step === 5 ? 'Color & Polish Finish' :
                step === 6 ? 'Sketches & Photos' :
                'Budget & Details'
              }
            </h2>
          </div>
          <div className="hidden sm:flex h-2 w-32 bg-dark-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-300"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step Panels */}
      <div className="min-h-[280px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {rooms.map((r) => {
                const isActive = roomType === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRoomType(r)}
                    className={`h-28 rounded-xl border flex flex-col items-center justify-center p-4 transition-all duration-200 ${
                      isActive ? 'bg-gold/15 border-gold text-gold shadow-gold scale-102' : 'bg-dark-surface border-dark-border hover:border-gold/30 text-muted-fg hover:text-foreground'
                    }`}
                  >
                    <span className="text-xs font-semibold tracking-wide text-center uppercase">{r}</span>
                  </button>
                );
              })}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="flex gap-4 items-center bg-dark-surface p-3 rounded-lg border border-dark-border max-w-sm">
                <Ruler className="h-4.5 w-4.5 text-gold shrink-0" />
                <span className="text-xs text-muted-fg uppercase font-semibold">Scale Unit:</span>
                <div className="flex gap-2">
                  {['inches', 'cm', 'feet'].map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUnit(u)}
                      className={`text-[10px] font-bold uppercase px-3 py-1 rounded border ${
                        unit === u ? 'bg-gold text-dark-bg border-gold' : 'border-dark-border text-subtle-fg'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                <Input
                  type="number"
                  label={`Width (${unit})`}
                  placeholder="Width parameter..."
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="bg-dark-bg border-dark-border"
                />
                <Input
                  type="number"
                  label={`Height (${unit})`}
                  placeholder="Height parameter..."
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="bg-dark-bg border-dark-border"
                />
                <Input
                  type="number"
                  label={`Depth (${unit})`}
                  placeholder="Depth parameter..."
                  value={depth}
                  onChange={(e) => setDepth(e.target.value)}
                  className="bg-dark-bg border-dark-border"
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4"
            >
              {materials.map((m) => {
                const isActive = material === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMaterial(m)}
                    className={`w-full text-left p-4 rounded-xl border flex justify-between items-center transition-all ${
                      isActive ? 'bg-gold/15 border-gold text-gold shadow-gold' : 'bg-dark-surface border-dark-border hover:border-gold/30 text-muted-fg hover:text-foreground'
                    }`}
                  >
                    <span className="text-sm font-semibold tracking-wide">{m}</span>
                    {isActive && <CheckCircle className="h-4.5 w-4.5" />}
                  </button>
                );
              })}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4"
            >
              {fabrics.map((f) => {
                const isActive = fabric === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFabric(f)}
                    className={`w-full text-left p-4 rounded-xl border flex justify-between items-center transition-all ${
                      isActive ? 'bg-gold/15 border-gold text-gold shadow-gold' : 'bg-dark-surface border-dark-border hover:border-gold/30 text-muted-fg hover:text-foreground'
                    }`}
                  >
                    <span className="text-sm font-semibold tracking-wide">{f}</span>
                    {isActive && <CheckCircle className="h-4.5 w-4.5" />}
                  </button>
                );
              })}
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <Input
                label="Polish Color Tone"
                placeholder="e.g. Natural Teak, Honey Walnut, Charcoal Black, Custom..."
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="bg-dark-bg border-dark-border"
              />

              <div className="flex flex-col gap-3">
                <label className="text-xs font-semibold text-muted-fg tracking-wide uppercase">Polish / Protective Coat</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {finishes.map((f) => {
                    const isActive = finish === f;
                    return (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFinish(f)}
                        className={`text-left p-3.5 rounded-lg border text-xs font-semibold uppercase tracking-wide transition-all ${
                          isActive ? 'bg-gold/15 border-gold text-gold shadow-gold' : 'bg-dark-surface border-dark-border hover:border-gold/30 text-muted-fg hover:text-foreground'
                        }`}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="border border-dashed border-dark-border rounded-xl p-8 text-center bg-dark-surface/40 hover:bg-dark-surface/60 transition-colors relative cursor-pointer flex flex-col items-center">
                <Input
                  type="file"
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  disabled={uploading}
                />
                <Upload className="h-8 w-8 text-gold mb-2.5 animate-pulse" />
                <h4 className="text-sm font-semibold">Upload Sketches or Room Photos</h4>
                <p className="text-xs text-subtle-fg mt-1">PNG, JPG, PDF up to 10MB</p>
                {uploading && <span className="text-[10px] text-gold mt-2 font-semibold">Uploading asset...</span>}
              </div>

              {photos.length > 0 && (
                <div className="flex flex-wrap gap-2.5 mt-2">
                  {photos.map((ph, idx) => (
                    <div key={idx} className="h-16 w-20 rounded-lg overflow-hidden border border-dark-border/80 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={ph} alt="Attachment" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {step === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Indicative Budget (INR)"
                  placeholder="Budget range..."
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="bg-dark-bg border-dark-border"
                />
                <Input
                  type="date"
                  label="Preferred Delivery Target Date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="bg-dark-bg border-dark-border"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-fg tracking-wide uppercase">Bespoke Design Requests & Notes</label>
                <textarea
                  placeholder="Mention unique custom details, carvings, base alterations, brass inlay wishes, etc..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full text-xs rounded-lg border border-dark-border bg-dark-bg p-3.5 text-foreground placeholder:text-subtle-fg focus-visible:outline-none focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold"
                />
              </div>
            </motion.div>
          )}

          {step === 8 && (
            <motion.div
              key="step8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-8"
            >
              <div className="h-16 w-16 rounded-full bg-gold/15 flex items-center justify-center text-gold mb-5 shadow-gold animate-bounce">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-semibold tracking-wide text-gold-light">
                Masterpiece Configured Successfully!
              </h3>
              <p className="text-xs text-muted-fg max-w-md mx-auto mt-2 leading-relaxed">
                Your bespoke custom furniture design parameters have been logged. A dedicated BKP design staff from our Hyderabad studio will connect with you via email within 24 hours to finalize sketches and material discussions.
              </p>
              <Button
                variant="outline"
                className="mt-6 text-xs h-9"
                onClick={() => {
                  setStep(1);
                  setWidth('');
                  setHeight('');
                  setDepth('');
                  setPhotos([]);
                  setNotes('');
                  setBudget('');
                  setPreferredDate('');
                }}
              >
                Configure Another Curation
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons footer */}
      {step <= 7 && (
        <div className="flex justify-between items-center border-t border-dark-border/60 pt-6 mt-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1}
            className="text-xs h-9.5"
          >
            <ChevronLeft className="h-4 w-4 mr-1.5" />
            Back
          </Button>

          {step < 7 ? (
            <Button variant="gold" onClick={handleNext} className="text-xs h-9.5 shadow-gold">
              Continue
              <ChevronRight className="h-4 w-4 ml-1.5" />
            </Button>
          ) : (
            <Button variant="gold" onClick={handleSubmit} loading={loading} className="text-xs h-9.5 shadow-gold">
              Submit Bespoke Request
            </Button>
          )}
        </div>
      )}

    </Card>
  );
}
