'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import { Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function DipUploadForm() {
  const t = useTranslations('Dips.New.Form');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    difficulty: 'medium',
    image: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const difficultyOptions = [
    { value: 'easy', label: t('difficulty.easy') },
    { value: 'medium', label: t('difficulty.medium') },
    { value: 'hard', label: t('difficulty.hard') },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setErrors((prev) => ({ ...prev, image: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = t('errors.titleRequired');
    if (!formData.description.trim()) newErrors.description = t('errors.descriptionRequired');
    if (!formData.ingredients.trim()) newErrors.ingredients = t('errors.ingredientsRequired');
    if (!formData.instructions.trim()) newErrors.instructions = t('errors.instructionsRequired');
    if (!formData.image) newErrors.image = t('errors.imageRequired');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // TODO: Supabase upload logic here
    // 1. Upload image to Supabase Storage
    // 2. Insert dip record with image URL + user_id
    // 3. Show success toast / redirect to new dip

    try {
      // Simulated delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(t('success.message'));
      // router.push(`/dips/newly-created-id`);
    } catch (err) {
      alert(t('errors.submitFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="dip-upload-form">
      <div className="form-grid">
        <div className="form-group image-upload-group">
          <label className="form-label">{t('labels.image')}</label>
          <div className={`image-upload-area ${errors.image ? 'error' : ''}`}>
            {formData.image ? (
              <div className="preview-container">
                <Image
                  src={URL.createObjectURL(formData.image)}
                  alt="Dip preview"
                  fill
                  className="image-preview"
                />
                <button
                  type="button"
                  className="remove-image"
                  onClick={() => setFormData((prev) => ({ ...prev, image: null }))}
                >
                  ×
                </button>
              </div>
            ) : (
              <label className="upload-placeholder">
                <ImageIcon size={48} className="upload-icon" />
                <span>{t('labels.uploadPrompt')}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input"
                />
              </label>
            )}
          </div>
          {errors.image && <p className="form-error">{errors.image}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="title">
            {t('labels.title')}
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            placeholder={t('placeholders.title')}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="difficulty">
            {t('labels.difficulty')}
          </label>
          <Select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            options={difficultyOptions}
          />
        </div>

        <div className="form-group full-width">
          <label className="form-label" htmlFor="ingredients">
            {t('labels.ingredients')}
          </label>
          <Textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            error={errors.ingredients}
            placeholder={t('placeholders.ingredients')}
            rows={4}
          />
        </div>

        <div className="form-group full-width">
          <label className="form-label" htmlFor="instructions">
            {t('labels.instructions')}
          </label>
          <Textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            error={errors.instructions}
            placeholder={t('placeholders.instructions')}
            rows={6}
          />
        </div>
      </div>

      <div className="form-actions">
        <Button
          type="submit"
          variant="success"
          size="large"
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? t('buttons.submitting') : t('buttons.submit')}
        </Button>
      </div>
    </form>
  );
}