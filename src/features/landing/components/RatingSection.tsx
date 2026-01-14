import CompanyCard from "./CompanyCard";
import ReviewCard from "./ReviewCard";

export default function RatingSection() {
  return (
    <section className="bg-lightGray py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Left */}
          <div>
            <h3 className="mb-6 text-center text-sm font-extrabold text-zinc-600">
              Nyeste bedømmelser
            </h3>

            <div className="space-y-4">
              <ReviewCard
                name="Jonas"
                company="Great Dane Trans..."
                task="Flytning fra 4. sal..."
                text="Alt godt 👍"
              />

              <ReviewCard
                name="Trine"
                company="MD Byggeservice..."
                task="Totalrenovering af b..."
                text="Vi har haft en rigtig god oplevelse..."
              />
            </div>
          </div>

          {/* Right */}
          <div>
            <h3 className="mb-6 text-center text-sm font-extrabold text-zinc-600">
              Bedste virksomheder
            </h3>

            <div className="space-y-4">
              <CompanyCard
                name="Sanadent"
                category="Tandlæge"
                rank="nr 2"
                image="/images/company1.jpg"
              />

              <CompanyCard
                name="Nibe Dyreklinik Aps"
                category="Dyrlæge"
                rank="nr 20"
                image="/images/company2.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
