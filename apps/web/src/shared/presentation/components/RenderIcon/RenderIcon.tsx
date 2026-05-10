import { FiMoreHorizontal } from "react-icons/fi";

import { TbTax } from "react-icons/tb";
import { LuCandy } from "react-icons/lu";
import { RiToothFill } from "react-icons/ri";
import { IoIosWallet } from "react-icons/io";
import { GoAlertFill } from "react-icons/go";
import type { IconType } from "react-icons/lib";
import { BiSolidTrafficBarrier } from "react-icons/bi";
import { FaHandHoldingUsd, FaWineBottle } from "react-icons/fa";
import { PiCookingPotFill, PiStudentBold, PiBankFill } from "react-icons/pi";
import {
  MdOutlineQuestionMark,
  MdShoppingCart,
  MdRestaurant,
  MdFastfood,
  MdLocalCafe,
  MdDeliveryDining,
  MdDirectionsBus,
  MdLocalTaxi,
  MdLocalGasStation,
  MdLocalParking,
  MdHomeRepairService,
  MdMovie,
  MdTv,
  MdSportsEsports,
  MdLocalPlay,
  MdLocalPharmacy,
  MdHealthAndSafety,
  MdFitnessCenter,
  MdSchool,
  MdMenuBook,
  MdElectricBolt,
  MdWaterDrop,
  MdWifi,
  MdPhoneIphone,
  MdHome,
  MdCheckroom,
  MdLaptopMac,
  MdWeekend,
  MdPets,
  MdContentCut,
  MdPark,
  MdFlight,
  MdCardGiftcard,
  MdFavorite,
  MdAttachMoney,
  MdLocalHospital,
} from "react-icons/md";

// eslint-disable-next-line react-refresh/only-export-components
export const ICON_MAP: {
  [key: string]: IconType;
} = {
  wallet: IoIosWallet,
  food: MdRestaurant,
  car: MdDirectionsBus,
  game: MdSportsEsports,
  health: MdHealthAndSafety,
  education: MdSchool,
  utilities: MdElectricBolt,
  shopping: MdShoppingCart,
  pet: MdPets,
  lifestyle: MdFavorite,
  salary: MdAttachMoney,
  other: FiMoreHorizontal,

  "graduation-cap": PiStudentBold,
  "hand-coins": FaHandHoldingUsd,
  tax: TbTax,
  debt: PiBankFill,
  snack: LuCandy,
  wine: FaWineBottle,
  alert: GoAlertFill,

  gas: PiCookingPotFill,
  toll: BiSolidTrafficBarrier,
  tooth: RiToothFill,

  cart: MdShoppingCart,
  restaurant: MdRestaurant,
  burger: MdFastfood,
  coffee: MdLocalCafe,
  delivery: MdDeliveryDining,
  bus: MdDirectionsBus,
  taxi: MdLocalTaxi,
  fuel: MdLocalGasStation,
  parking: MdLocalParking,
  tools: MdHomeRepairService,
  movie: MdMovie,
  tv: MdTv,
  controller: MdSportsEsports,
  ticket: MdLocalPlay,
  pharmacy: MdLocalPharmacy,
  doctor: MdLocalHospital,
  insurance: MdHealthAndSafety,
  gym: MdFitnessCenter,
  course: MdSchool,
  book: MdMenuBook,
  electricity: MdElectricBolt,
  water: MdWaterDrop,
  wifi: MdWifi,
  phone: MdPhoneIphone,
  home: MdHome,
  tshirt: MdCheckroom,
  laptop: MdLaptopMac,
  sofa: MdWeekend,
  "pet-food": MdPets,
  vet: MdLocalHospital,
  scissors: MdContentCut,
  park: MdPark,
  plane: MdFlight,
  gift: MdCardGiftcard,
  heart: MdFavorite,
};
export interface RenderIconProps {
  name: string;
  color?: string;
}

export const RenderIcon = ({ name, color = "white" }: RenderIconProps) => {
  const IconComponent = ICON_MAP[name] || MdOutlineQuestionMark;

  if (!IconComponent) return null;

  return <IconComponent color={color} />;
};
