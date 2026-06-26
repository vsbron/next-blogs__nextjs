function Copyrights() {
  // Returned JSX
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-4 text-sm">
      <svg
        width="122"
        height="30"
        className="fill-foreground/90 w-[101px] h-[25px] sm:w-[122px] sm:h-[30px]"
      >
        <title>NextBlog</title>
        <use href="/logo.svg#logo"></use>
      </svg>
      <span className="inline-block">
        Built by VSBroN as a portfolio{" "}
        <a
          href="https://github.com/vsbron/next-blogs__nextjs"
          target="_blank"
          className="underline hover:no-underline"
        >
          project
        </a>
        .
      </span>
      <span>&copy;{new Date().getFullYear()}. All rights reserved.</span>
    </div>
  );
}

export default Copyrights;
