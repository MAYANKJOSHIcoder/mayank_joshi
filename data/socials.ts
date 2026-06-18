import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaEnvelope } from "react-icons/fa6";

export interface Social {
  name: string;
  url: string;
  icon: IconType;
}

export const socials: Social[] = [
  {
    name: "GitHub",
    url: "https://github.com/MAYANKJOSHIcoder",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mayank-joshi-a70591271",
    icon: FaLinkedinIn,
  },
  {
    name: "Twitter",
    url: "https://x.com/MayankJoshi200",
    icon: FaXTwitter,
  },
];
