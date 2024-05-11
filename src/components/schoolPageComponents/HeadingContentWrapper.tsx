const HeadingContentWrapper: React.FC<{
  heading: any;
  content: any;
  size?: string;
}> = ({ heading, content, size = "text-2xl" }) => {
  return (
    <div>
      <h1 className={`mb-4 text-2xl font-medium text-blue-500 md:${size}`}>
        {heading}
      </h1>
      {content}
    </div>
  );
};

export default HeadingContentWrapper;
