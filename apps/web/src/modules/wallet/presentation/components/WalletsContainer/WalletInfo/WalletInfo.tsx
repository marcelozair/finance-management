import { Box, Flex, Heading, Progress } from "@chakra-ui/react";
import { formatMoney } from "@shared/utils/currency";
import { useMemo } from "react";
import { LuBadgeAlert, LuCheckCheck } from "react-icons/lu";
import { MdDangerous } from "react-icons/md";
import { Amount } from "src/core/domain/vo/Amount";
import { Currency } from "src/core/domain/vo/Currency";
import { useWalletStore } from "../../../store/useWalletStore";
import { WalletTypes } from "src/modules/wallet/domain/entities/Wallet";

interface CreditCardInfoProps {
  balance: Amount;
  creditLine: Amount | null;
}

const statusColors = {
  good: "green.300",
  warning: "yellow.300",
  danger: "red.300",
};

export const CreditCardInfo = ({
  balance,
  creditLine,
}: CreditCardInfoProps) => {
  const percentage = useMemo(() => {
    if (!creditLine) return 0;
    return balance.divide(creditLine.getValue()).multiply(100).getValue();
  }, [balance, creditLine]);

  const status = useMemo(() => {
    if (percentage < 50) return "good";
    if (percentage < 80) return "warning";
    return "danger";
  }, [percentage]);

  return (
    <Progress.Root variant="outline" mb={5} value={percentage}>
      <Progress.Track h={"60px"}>
        <Progress.Range bg={statusColors[status]} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Heading size="lg">
            {creditLine
              ? formatMoney(creditLine.subtract(balance), new Currency("PEN"))
              : "N/A"}
          </Heading>

          <Box
            position="absolute"
            top={2}
            right={2}
            w={5}
            h={5}
            bg="white"
            borderRadius="full"
            p={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {status === "good" && <LuCheckCheck size={15} color="green" />}
            {status === "warning" && <LuBadgeAlert size={15} color="orange" />}
            {status === "danger" && <MdDangerous size={15} color="red" />}
          </Box>
        </div>
      </Progress.Track>
    </Progress.Root>
  );
};

export const WalletInfo = () => {
  const { selectedWallet } = useWalletStore();

  if (selectedWallet) {
    return (
      <>
        <Flex
          mb={5}
          alignItems="center"
          justifyContent="space-between"
          // direction="columns"
        >
          <Heading size="lg">{selectedWallet._name}</Heading>
          <Heading size="lg" opacity={0.5}>
            {formatMoney(
              selectedWallet._balance.abs(),
              selectedWallet._currency,
            )}
          </Heading>
        </Flex>
        {selectedWallet._type === WalletTypes.CREDIT && (
          <CreditCardInfo
            creditLine={selectedWallet._creditLine}
            balance={selectedWallet._balance.abs()}
          />
        )}
      </>
    );
  }
};
