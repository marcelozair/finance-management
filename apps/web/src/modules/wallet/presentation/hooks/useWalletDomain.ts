import { useMemo } from "react";
import { WalletDomain } from "../../application";
import { serviceLocator } from "@core/services/ServiceLocator";

export const useWalletDomain = () => {
  const walletDomain = useMemo(() => {
    const FailureHandler = serviceLocator.getFailureHandler();
    const APIClient = serviceLocator.getAuthenticatedAPIClient();
    return new WalletDomain(APIClient, FailureHandler);
  }, []);

  return walletDomain;
};
