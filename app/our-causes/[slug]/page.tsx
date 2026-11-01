import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import causesData from "@/app/data/causes.json";
import CauseDetailsLayout from "@/app/components/causes/CauseDetailsLayout";
import type { CauseItem } from "@/app/types/causes";
import Loading from "@/app/components/ui/Loading";

const causes = causesData.causes as CauseItem[];
type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return causes.map((cause) => ({ slug: cause.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cause = causes.find((item) => item.slug === slug);
  if (!cause) return { title: "Cause Not Found" };
  return {
    title: cause.title,
    description: cause.description,
  };
}

async function CauseDetailsContent({ params }: PageProps) {
  const { slug } = await params;
  const cause = causes.find((item) => item.slug === slug);

  if (!cause) notFound();

  return (
    <CauseDetailsLayout
      cause={cause}
      related={causes.filter((item) => item.slug !== slug).slice(0, 2)}
    />
  );
}

export default function CauseDetailsPage({ params }: PageProps) {
  return (
    <Suspense fallback={<Loading />}>
      <CauseDetailsContent params={params} />
    </Suspense>
  );
}
