import HeaderBackgroundImage from "./BackgroundImage";

const ContentHeader = ({ children }) => {
  return (
    <div className="relative flex h-[312px] w-full flex-col gap-2 overflow-hidden rounded-b-[20px] bg-bs-primary p-2 md:p-4">
      <HeaderBackgroundImage />
      {children}
    </div>
  );
};

export default ContentHeader;
