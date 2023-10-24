import Image from "next/image";

const ContentHeader = ({ children }) => {
  return (
    <div className="relative flex h-[350px] w-full flex-col items-center gap-2 overflow-hidden rounded-lg bg-bs-primary p-2 md:p-4 lg:h-[300px]">
      <Image
        width={100}
        height={100}
        className="absolute h-full w-full object-cover"
        src="/assets/images/doodleBackground.svg"
        alt="doodleBg"
      />
      <div className="flex h-full flex-col items-center justify-center gap-4 md:items-start">
        {children}
      </div>
    </div>
  );
};

export default ContentHeader;
