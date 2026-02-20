import { getTranslations } from "next-intl/server";
import DipUploadForm from "@/components/dips/DipUploadForm";
import { serverRedirect } from "@/i18n/utils";
import { Locale } from "@/i18n/locales";
import { createSupabaseServer } from "@/lib/supabase-server";

export default async function NewDipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations("Dips.New");
  const { locale } = await params;

  const supabase = await createSupabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    serverRedirect("/dips/new", locale as Locale);
  }

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
