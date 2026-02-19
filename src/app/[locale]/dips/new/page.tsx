import { getTranslations } from "next-intl/server";
import DipUploadForm from "@/components/dips/DipUploadForm";

export default async function NewDipPage() {
  const t = await getTranslations("Dips.New");

  return (
    <main className="new-dip-page">
      <section className="new-dip-hero">
        <div className="container text-center">
          <h1 className="new-dip-title">{t("title")}</h1>
          <p className="new-dip-subtitle">{t("subtitle")}</p>
        </div>
      </section>

      <section className="new-dip-form-section">
        <div className="container">
          <DipUploadForm />
        </div>
      </section>
    </main>
  );
}
