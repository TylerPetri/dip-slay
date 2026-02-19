import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Clock, ChefHat } from 'lucide-react';
import Button from '@/components/ui/Button';

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export default async function DipDetailPage({ params }: Props) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Dips.Detail' });

  // Later: fetch real dip from Supabase by id
  // const dip = await getDipById(id);
  // if (!dip) notFound();

  const mockDip = {
    id,
    title: "Spicy Ghost Pepper Queso with Chorizo Crunch",
    imageUrl: "https://images.unsplash.com/photo-1626645738538-2b5a9c5b7c4e?w=1200",
    creatorHandle: "@spicyking",
    creatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    votes: 1248,
    slayScore: 92,
    difficulty: "hard",
    prepTime: "15 mins",
    cookTime: "20 mins",
    servings: 8,
    ingredients: [
      "8 oz cream cheese, softened",
      "2 cups shredded cheddar",
      "1 cup milk",
      "4 oz chorizo, cooked & crumbled",
      "2–3 ghost peppers, finely chopped (adjust to heat tolerance)",
      "1 tsp garlic powder",
      "Salt & pepper to taste"
    ],
    instructions: [
      "In a saucepan over medium heat, melt cream cheese with milk until smooth.",
      "Add shredded cheddar gradually, stirring until melted.",
      "Mix in cooked chorizo, ghost peppers, and garlic powder.",
      "Season with salt & pepper. Simmer 5–10 mins until thickened.",
      "Serve hot with chips or veggies. Garnish with extra chorizo."
    ],
    createdAt: "2025-12-15"
  };

  return (
    <main className="dip-detail-page">
      <section className="dip-hero">
        <Image
          src={mockDip.imageUrl}
          alt={mockDip.title}
          fill
          className="hero-image"
          priority
        />
        <div className="hero-overlay">
          <div className="container">
            <h1 className="dip-title">{mockDip.title}</h1>
            <div className="creator-info">
              <Image
                src={mockDip.creatorAvatar}
                alt={`${mockDip.creatorHandle} avatar`}
                width={48}
                height={48}
                className="creator-avatar"
              />
              <Link href={`/cooks/${mockDip.creatorHandle.slice(1)}`} className="creator-link">
                {mockDip.creatorHandle}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="dip-stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <Heart size={24} className="stat-icon text-accent" fill="currentColor" />
              <div>
                <span className="stat-number">{mockDip.votes.toLocaleString()}</span>
                <span className="stat-label">{t('votes')}</span>
              </div>
            </div>

            <div className="stat-item">
              <span className="stat-number">{mockDip.slayScore}%</span>
              <span className="stat-label">{t('slayScore')}</span>
            </div>

            <div className="stat-item">
              <ChefHat size={24} className="stat-icon" />
              <div>
                <span className="stat-number">{mockDip.difficulty}</span>
                <span className="stat-label">{t('difficulty')}</span>
              </div>
            </div>

            <div className="stat-item">
              <Clock size={24} className="stat-icon" />
              <div>
                <span className="stat-number">{mockDip.prepTime} + {mockDip.cookTime}</span>
                <span className="stat-label">{t('time')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dip-content">
        <div className="container">
          <div className="content-grid">
            <div className="ingredients-section">
              <h2 className="section-title">{t('ingredients')}</h2>
              <ul className="ingredients-list">
                {mockDip.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>

            <div className="instructions-section">
              <h2 className="section-title">{t('instructions')}</h2>
              <ol className="instructions-list">
                {mockDip.instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="more-from-cook">
        <div className="container text-center">
          <h3 className="more-title">
            More from {mockDip.creatorHandle}
          </h3>
            <Button link href={`/cooks/${mockDip.creatorHandle.slice(1)}`} variant="outline" size="large">
              {t('viewAllDips')}
            </Button>
        </div>
      </section>
    </main>
  );
}