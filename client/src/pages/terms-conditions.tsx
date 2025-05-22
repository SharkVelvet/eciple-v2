import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-8">Terms & Conditions</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground text-opacity-80">
              Terms & Conditions content will be added here.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}