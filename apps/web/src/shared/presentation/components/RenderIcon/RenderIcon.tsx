import {
  FiCoffee,
  FiTruck,
  FiFilm,
  FiHeart,
  FiBook,
  FiZap,
  FiDollarSign,
  FiMoreHorizontal,
} from "react-icons/fi";

import { IoIosWallet } from "react-icons/io";
import type { IconType } from "react-icons/lib";
import { MdOutlineQuestionMark } from "react-icons/md";

// eslint-disable-next-line react-refresh/only-export-components
export const ICON_MAP: {
  [key: string]: IconType;
} = {
  wallet: IoIosWallet,
  food: FiCoffee,
  transport: FiTruck,
  entertainment: FiFilm,
  health: FiHeart,
  education: FiBook,
  utilities: FiZap,
  salary: FiDollarSign,
  other: FiMoreHorizontal,
};
export interface RenderIconProps {
  name: string;
  className?: string;
}

export const RenderIcon = ({ name, className = "" }: RenderIconProps) => {
  const IconComponent = ICON_MAP[name] || MdOutlineQuestionMark;

  if (!IconComponent) return null;

  return <IconComponent className={className} />;
};
