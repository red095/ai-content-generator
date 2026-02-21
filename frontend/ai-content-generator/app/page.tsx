import GeneratorForm from "./components/GeneratorForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 md:p-24 selection:bg-purple-500/30">
      <div className="w-full max-w-3xl flex flex-col items-center text-center space-y-6">

        {/* Hero Section */}
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              AI Content
            </span>{" "}
            Generator
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Instantly transform your ideas into professional blog outlines, essays, and social media posts powered by OpenAI.
          </p>
        </div>

        {/* Form Component Container */}
        <div className="w-full w-full max-w-2xl translate-y-2">
          <GeneratorForm />
        </div>

      </div>
    </main>
  );
}