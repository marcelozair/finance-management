import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { SimpleGrid, Spinner, Center, Button, Flex } from "@chakra-ui/react";

import { ProfileDomain } from "../../../application";
import { ProfileCard } from "./components/ProfileCard";
import type { Profile } from "../../../domain/entities/Profile";
import { CreateProfileCard } from "./components/CreateProfileCard";
import { Heading } from "../../../../../shared/presentation/components/content/Heading";
import { useProfile } from "../../../../../shared/presentation/store/profile/useProfile";
import { SubHeading } from "../../../../../shared/presentation/components/content/SubHeading";
import { useExecuteUseCase } from "../../../../../shared/presentation/hooks/useExecuteUseCase";

export const SelectProfileView = () => {
  const profileDomain = new ProfileDomain();

  const navigate = useNavigate();
  const { profile: activeProfile, setProfile } = useProfile();

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const { execute, loading } = useExecuteUseCase<void, void>({
    callback: async () => {
      try {
        const profiles = await profileDomain.getProfiles();
        setProfiles(profiles);
      } catch {
        setFetchError("Failed to load profiles");
      }
    },
  });

  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (profile: Profile) => {
    setProfile(profile);

    if (activeProfile) {
      navigate("/admin/wallet");
    }
  };

  const handleCreateProfile = () => {
    // navigate("/admin/create-profile")
  };

  return (
    <Flex
      py={12}
      h="100vh"
      align={"center"}
      justify={"center"}
      direction={"column"}
      bg={{ base: "gray.100", _dark: "gray.900" }}
      transition="background-color 0.2s"
    >
      <Flex align="center" direction="column" mb={10}>
        <Heading mb={2}>Welcome Back</Heading>
        <SubHeading>Please select a financial profile to continue.</SubHeading>
      </Flex>

      {loading ? (
        <Center py={20}>
          <Spinner size="xl" color="blue.500" borderWidth="4px" />
        </Center>
      ) : fetchError ? (
        <Center py={20} flexDirection="column" gap={4}>
          <SubHeading color="red.500" fontWeight="medium">
            {fetchError}
          </SubHeading>
          <Button colorPalette="blue" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Center>
      ) : (
        <>
          <SimpleGrid
            mx="auto"
            gap={8}
            columns={{ base: 1, sm: 2, md: 2 }}
            w={{ sm: "80%", md: "1/2", lg: "1/3" }}
          >
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onClick={() => handleSelect(profile)}
              />
            ))}
            <CreateProfileCard onClick={handleCreateProfile} />
          </SimpleGrid>
        </>
      )}
    </Flex>
  );
};
