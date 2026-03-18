import { useAtom } from "jotai";
import { useEffect } from "react";
import { activeProfileAtom } from "./profileStore";
import type { Profile } from "../../../../modules/profiles/domain/entities/Profile";
import { serviceLocator } from "../../../../core/services/ServiceLocator";

const LOCAL_STORAGE_PROFILE_KEY = "selected-profile";

/**
 * Custom hook to manage the global Profile state and Local Storage synchronization.
 */
export const useProfile = () => {
  const [profile, setProfileState] = useAtom(activeProfileAtom);
  const localStorage = serviceLocator.getLocalStorage();

  useEffect(() => {
    if (!profile) {
      const storedProfile = localStorage.get<Profile>(
        LOCAL_STORAGE_PROFILE_KEY,
        null as null,
      );
      if (storedProfile) {
        setProfileState(storedProfile);
      }
    }
  }, [profile, setProfileState, localStorage]);

  const setProfile = (newProfile: Profile | null) => {
    console.info("Setting profile into locaStorage and Store");
    setProfileState(newProfile);

    if (newProfile) {
      localStorage.save(LOCAL_STORAGE_PROFILE_KEY, newProfile);
    } else {
      window.localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
    }
  };

  return {
    profile,
    setProfile,
  };
};
