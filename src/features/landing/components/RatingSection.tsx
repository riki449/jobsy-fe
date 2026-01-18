"use client";

import { useEffect, useState } from "react";
import { ReviewsAndCompaniesResponse } from "../types";
import CompanyCard from "./CompanyCard";
import ReviewCard from "./ReviewCard";

interface IRatingProps {
  data?: ReviewsAndCompaniesResponse;
}

export default function RatingSection({ data }: IRatingProps) {
  const reviews = data?.reviews.items ?? [];
  const companies = data?.companies.items ?? [];

  const STEP = 2;
  const INTERVAL = 4500;
  const DURATION = 500;

  const [reviewIndex, setReviewIndex] = useState(0);
  const [companyIndex, setCompanyIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reviews.length <= STEP && companies.length <= STEP) return;

    const id = setInterval(() => {
      // slide out
      setVisible(false);

      setTimeout(() => {
        setReviewIndex((prev) =>
          prev + STEP >= reviews.length ? 0 : prev + STEP
        );
        setCompanyIndex((prev) =>
          prev + STEP >= companies.length ? 0 : prev + STEP
        );

        // slide in
        setVisible(true);
      }, DURATION);
    }, INTERVAL);

    return () => clearInterval(id);
  }, [reviews.length, companies.length]);

  const visibleReviews = reviews.slice(reviewIndex, reviewIndex + STEP);
  const visibleCompanies = companies.slice(companyIndex, companyIndex + STEP);

  return (
    <section className="bg-lightGray py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Reviews */}
          <div>
            <h3 className="mb-6 text-center text-sm font-extrabold text-zinc-600">
              Nyeste bedømmelser
            </h3>

            <div
              className={`space-y-4 transform transition-all duration-500 ease-in-out
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
            >
              {visibleReviews.map((review) => (
                <ReviewCard
                  key={review.review_id}
                  name={review.user.first_name}
                  company={`${review.company.company_name}...`}
                  task={review.job.headline}
                  text={review.message}
                  rating={review.stars_count}
                />
              ))}
            </div>
          </div>

          {/* Companies */}
          <div>
            <h3 className="mb-6 text-center text-sm font-extrabold text-zinc-600">
              Bedste virksomheder
            </h3>

            <div
              className={`space-y-4 transform transition-all duration-500 ease-in-out
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
            >
              {visibleCompanies.map((company) => (
                <CompanyCard
                  key={company.company_id}
                  name={company.company_name}
                  category={company.project}
                  rank={`nr ${company.trust_position}`}
                  image={company.avatar_url}
                  rating={company.rating_average}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
