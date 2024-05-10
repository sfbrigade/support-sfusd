const HeadingContentWrapper = (props: any) => {
  const { heading, content, size } = props;
  return (
    <div>
      <h1 className="mb-4 text-2xl font-medium text-blue-500">{heading}</h1>
      {content}
    </div>
  );
};

export default HeadingContentWrapper;
