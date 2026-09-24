import { useState } from "react";
import { motion } from "framer-motion";
import { commercialWorks } from "../../data/commercial";
import { CommercialCard } from "../ui/CommercialCard";
import { CommercialBackground } from "../ui/CommercialBackground";
import Lightbox from "../ui/Lightbox";
import { Section } from "../ui/Section";

export const Commercial = () => {
  const [selectedWork, setSelectedWork] = useState<number | null>(null);

  const currentWork = selectedWork !== null ? commercialWorks[selectedWork] : null;

  return (
    <Section
      id="commercial"
      tone="light"
      className="overflow-hidden"
      background={<CommercialBackground />}
      title={
        <h2
          className="section-heading"
          style={{
            color: "#fff8e8",
            textShadow:
              "0 2px 18px rgba(0, 0, 0, 0.55), 0 0 36px rgba(255, 236, 179, 0.45)",
          }}
        >
          Commercial Work
        </h2>
      }
      subtitle={
        <p
          className="section-subheading mx-auto max-w-2xl"
          style={{
            color: "#f5e6c8",
            textShadow: "0 1px 12px rgba(0, 0, 0, 0.45)",
          }}
        >
          Photography and commissioned work, lit apart from the void.
        </p>
      }
    >
      {commercialWorks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {commercialWorks.map((work, index) => (
            <CommercialCard
              key={work.id}
              work={work}
              index={index}
              onClick={() => setSelectedWork(index)}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl rounded-lg border px-8 py-16 text-center"
          style={{
            background: "rgba(20, 14, 10, 0.38)",
            borderColor: "rgba(253, 230, 138, 0.4)",
            boxShadow: "0 0 40px rgba(253, 224, 165, 0.18)",
          }}
        >
          <p className="text-lg font-medium" style={{ color: "#fff7e6" }}>
            Selected client work will live here.
          </p>
          <p className="mt-3 text-sm" style={{ color: "#e8d5a8" }}>
            Commissioned photography and commercial pieces, shown in the light.
          </p>
        </motion.div>
      )}

      {currentWork && (
        <Lightbox
          isOpen={selectedWork !== null}
          onClose={() => setSelectedWork(null)}
          imageSrc={currentWork.fullImage || currentWork.image}
          imageAlt={currentWork.title}
          title={
            currentWork.client
              ? `${currentWork.title} — ${currentWork.client}`
              : currentWork.title
          }
        />
      )}
    </Section>
  );
};
