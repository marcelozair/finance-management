import { useMemo } from "react";
import { TransactionDomain } from "../../application";
import { serviceLocator } from "@core/services/ServiceLocator";

export const useTransactionDomain = () => {
  const transactionDomain = useMemo(() => {
    const FailureHandler = serviceLocator.getFailureHandler();
    const APIClient = serviceLocator.getAuthenticatedAPIClient();
    return new TransactionDomain(APIClient, FailureHandler);
  }, []);

  return transactionDomain;
};
