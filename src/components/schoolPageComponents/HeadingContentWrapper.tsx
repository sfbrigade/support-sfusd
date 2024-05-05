const HeadingContentWrapper = (props: any) => {
  const { heading, content, size } = props;
  return (
    <>
      <h1 className="text-2xl font-medium text-blue-500">{heading}</h1>
      {content}
      <></>
    </>
  );
};

export default HeadingContentWrapper;
