"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase-client";
import { useAuth } from "@/hooks/useAuth";

export default function DipUploadForm() {
  const t = useTranslations("Dips.New.Form");
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    difficulty: "medium",
    image: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const difficultyOptions = [
    { value: "easy", label: t("difficulty.easy") },
    { value: "medium", label: t("difficulty.medium") },
    { value: "hard", label: t("difficulty.hard") },
  ];

  if (authLoading) return <div>Loading auth state...</div>;
  if (!user) {
    return (
      <div className="text-center py-20">Please log in to upload a dip.</div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, image: t("errors.imageInvalidType") }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: t("errors.imageTooLarge") }));
        return;
      }

      setFormData((prev) => ({ ...prev, image: file }));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = t("errors.titleRequired");
    // if (!formData.description.trim())
    //   newErrors.description = t("errors.descriptionRequired");
    if (!formData.ingredients.trim())
      newErrors.ingredients = t("errors.ingredientsRequired");
    if (!formData.instructions.trim())
      newErrors.instructions = t("errors.instructionsRequired");
    if (!formData.image) newErrors.image = t("errors.imageRequired");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("User not authenticated")
      }

      const fileExt = formData.image!.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `public/${fileName}`; // or `user_${user.id}/${fileName}` for private

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("dips")
        .upload(filePath, formData.image!, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("dips").getPublicUrl(filePath);

      const { error: insertError } = await supabase.from("dips").insert({
        user_id: user.id,
        title: formData.title.trim(),
        description: formData.description.trim(),
        ingredients: formData.ingredients.split(",").map((i) => i.trim()),
        instructions: formData.instructions.trim(),
        image_url: publicUrl,
        difficulty: formData.difficulty,
      });

      if (insertError) throw insertError;

      toast.success(t("success.message"), { duration: 6000, icon: "🔥" });

      setFormData({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        difficulty: "medium",
        image: null,
      });

      // router.push("/dips/new"); // or redirect to the new dip's page
    } catch (err: any) {
      console.error("Upload error:", err);
      toast.error(err.message || t("errors.submitFailed"), { duration: 6000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="dip-upload-form">
      <div className="form-grid">
        <div className="form-group image-upload-group">
          <label className="form-label">{t("labels.image")}</label>
          <div className={`image-upload-area ${errors.image ? "error" : ""}`}>
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
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, image: null }))
                  }
                >
                  ×
                </button>
              </div>
            ) : (
              <label className="upload-placeholder">
                <ImageIcon size={48} className="upload-icon" />
                <span>{t("uploadPrompt")}</span>
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
            {t("labels.title")}
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            placeholder={t("placeholders.title")}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="difficulty">
            {t("labels.difficulty")}
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
            {t("labels.ingredients")}
          </label>
          <Textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            error={errors.ingredients}
            placeholder={t("placeholders.ingredients")}
            rows={4}
          />
        </div>

        <div className="form-group full-width">
          <label className="form-label" htmlFor="instructions">
            {t("labels.instructions")}
          </label>
          <Textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            error={errors.instructions}
            placeholder={t("placeholders.instructions")}
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
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 size={20} className="animate-spin" />
              {t("buttons.submitting")}
            </span>
          ) : (
            t("buttons.submit")
          )}
        </Button>
      </div>
    </form>
  );
}
