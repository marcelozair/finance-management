import { useAtom } from "jotai";
import { useEffect } from "react";

import {
  activeProfileAtom,
  loadingProfileAtom,
  profileStore,
} from "./profileStore";
import { serviceLocator } from "../../../../core/services/ServiceLocator";
import type { Profile } from "../../../../modules/profiles/domain/entities/Profile";

const LOCAL_STORAGE_PROFILE_KEY = "selected-profile";

/**
 * Custom hook to manage the global Profile state and Local Storage synchronization.
 */
export const useProfile = () => {
  const localStorage = serviceLocator.getLocalStorage();

  const [profile, setProfileState] = useAtom(activeProfileAtom, {
    store: profileStore,
  });

  const [loading, setLoading] = useAtom(loadingProfileAtom, {
    store: profileStore,
  });

  const logger = serviceLocator.getLogger();

  const setProfile = (newProfile: Profile | null) => {
    logger.info("Setting profile into locaStorage and Store");
    setProfileState(newProfile);

    if (newProfile) {
      localStorage.save(LOCAL_STORAGE_PROFILE_KEY, newProfile);
    } else {
      window.localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
    }
  };

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

    setLoading(false);
  }, []);

  return {
    loading,
    profile,
    setProfile,
  };
};
