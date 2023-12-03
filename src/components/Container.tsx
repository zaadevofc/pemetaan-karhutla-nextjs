const Container = (props: any) => {
  return <div className={`${props.className} mx-auto flex max-w-7xl`}>{props.children}</div>;
};

export default Container;
