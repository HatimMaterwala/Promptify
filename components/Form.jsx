import React from "react";
import Link from 'next/link'
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full m-auto px-10 flex flex-col items-center justify-start">
      <h1 className="text-5xl mt-5 text-center text-gray-800 font-mono font-bold">
        {type} Post
      </h1>
      <p className="font-mono text-xl mt-2 opacity-50">
        {type === "Create"
          ? "Create a new prompt and tag for your post."
          : "Edit your prompt and tag for your post."}
      </p>

      <form
        onSubmit={handleSubmit}
        className="md:w-1/2 m-auto mt-8 flex flex-col gap-2"
      >
        <div>
          <label className="text-xl font-mono text-gray-800" htmlFor="prompt">
            Prompt
          </label>
          <textarea
            type="text"
            name="prompt"
            id="prompt"
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            className="w-full p-2 h-[200px] border border-black rounded-md"
            required
            disabled={submitting}
            placeholder="Enter your prompt..."
          />
        </div>

        <div>
          <label className="text-xl font-mono text-gray-800" htmlFor="tag">
            tags{" "}
            <span className="opacity-50">{`(#webdevelopment, #marketing, etc...)`}</span>
          </label>
          <input
            type="text"
            className="w-full p-2 border border-black rounded-md"
            value={post.tag}
            name="tag"
            id="tag"
            required
            placeholder="Enter relevant tags..."
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }}
          />
        </div>

        <div className="mt-2 flex justify-end gap-3">
          <Link className="text-white border border-white bg-black p-2 rounded-lg" href={"/"}>Cancel</Link>
          <button type="submit" className="bg-white border border-black text-black p-2 rounded-lg" disabled={submitting}>{submitting ? type+'ing...' : type}</button>
        </div>
      </form>
    </section>
  );
};

export default Form;
Form;
