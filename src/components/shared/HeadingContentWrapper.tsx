const HeadingContentWrapper = (props: any) => {
  const { heading, content, size } = props;
  return (
    <>
      <h1 className="text-blue-500 font-medium text-2xl">{heading}</h1>
      {content}
      <></>
    </>
  );
};

export default HeadingContentWrapper;
