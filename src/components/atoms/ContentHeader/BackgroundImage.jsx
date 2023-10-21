import Image from "next/image";
const HeaderBackgroundImage = () => {
  return (
    <Image
      fill
      className="z-0 w-full object-cover"
      src="/assets/images/doodleBackground.svg"
      alt="doodleBg"
    />
  );
};

export default HeaderBackgroundImage;
