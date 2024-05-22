"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  let router = useRouter();
  const handleChange = async (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/dataconn", {
        email,
      });
      if (res.data) {
        router.push("/playground");
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <header>
        <nav class=" border-gray-200 px-4 lg:px-6 py-2.5 ">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" class="flex items-center">
              <img src="logo.png" class="mr-3 h-6 sm:h-9" alt="llmpare" />
              <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                LLMPARE
              </span>
            </a>
          </div>
        </nav>
      </header>
      <div className="m-auto w-full mt-80">
        <h1 class="mb-4 ml-80 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Uncover the Best LLM for Your Needs!
        </h1>
        <p class="mb-6 text-lg ml-20 font-normal mt-10 text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Explore the capabilities of leading Large Language Models (LLMs) with
          our comprehensive comparison tool. Our platform allows you to evaluate
          and contrast responses from different LLMs, helping you identify the
          model that best fits your specific requirements. Whether you’re
          looking for accuracy, creativity, speed, or specialized knowledge, our
          detailed analysis provides you with the insights you need to make an
          informed decision. Start comparing now and find the perfect LLM for
          your projects!
        </p>

        <form>
          <label
            for="search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="m-auto   relative w-1/3  mt-8">
            <input
              type="search"
              id="search"
              class="block w-full outline-none p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@llmpare.com"
              required
              name="email"
              value={email}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={handleSubmit}
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get Started
            </button>
          </div>
        </form>
      </div>
      {/* contact form */}
      <section className="mt-60">
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Got a technical issue? Want to send feedback about a beta feature?
            Let us know.
          </p>
          <form action="#" class="space-y-8">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="name@llmpare.com"
                required
              />
            </div>
            <div>
              <label
                for="subject"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Let us know how we can help you"
                required
              />
            </div>
            <div class="sm:col-span-2">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="6"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              type="submit"
              class="py-3 px-5 text-sm font-medium text-center bg-indigo-400 text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
      {/* footer */}

      <footer class="">
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="/" class="hover:underline">
              Llmpare™
            </a>
            . All Rights Reserved.
          </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
