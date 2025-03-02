import Feed from "@/components/Feed";
export default function Home() {
  return (
    <section className="max-w-[90vw] m-auto my-10">
      <div className="homePage flex flex-col items-center justify-center gap-4">
        <h1 className="text-6xl font-mono stroke-text font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-pink-500 bg-clip-text text-transparent">
          Promptify
        </h1>
        <h2 className="text-4xl text-center font-mono stroke-text my-2 opacity-40 mb-4">
          Ignite Your Creativity with Inspiring Prompts
        </h2>
        <p className="text-2xl font-mono text-center w-[90%]">
          Dive into a world of curated prompts designed to spark ideas, boost
          productivity, and elevate your creative journey. Whether you're a
          writer, artist, or innovator, find the perfect prompt to fuel your
          next breakthrough.
        </p>
      </div>

      {/* Add a Search Functionality */}
      <Feed/>
      
    </section>
  );
}
