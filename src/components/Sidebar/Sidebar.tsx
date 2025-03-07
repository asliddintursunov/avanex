import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  useColorMode,
  Center,
  Text,
  AccordionPanel,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { useTranslation } from "react-i18next";

// Icons
import {
  MdCancel,
  MdDashboard,
  MdPerson,
  MdReport,
  MdSell,
} from "react-icons/md";
import {
  FaProductHunt,
  FaSalesforce,
  FaTruckLoading,
  FaWarehouse,
} from "react-icons/fa";
import { BiDollar, BiMoney, BiPurchaseTag } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { getCookie } from "../../lib/actions";

interface SidebarType {
  value: string;
  path: string;
  icon: IconType;
  children: SidebarType[];
}

export default function Sidebar() {
  const { t } = useTranslation();
  const job_title = (getCookie("job_title") as "Bugalter" | "Manager") || "";

  const Main: SidebarType[] = [
    ...(job_title === "Manager"
      ? [
          {
            path: "/dashboard",
            value: t("menus.dashboard"),
            icon: MdDashboard,
            children: [],
          },
        ]
      : []),
  ];

  const Sales: SidebarType[] = [
    {
      path: "#",
      value: t("menus.sales"),
      icon: MdSell,
      children: [
        {
          path: "/sales-order",
          value: t("menus.sales_order"),
          icon: FaSalesforce,
          children: [],
        },
        ...(job_title === "Manager"
          ? [
              {
                path: "/loaded-items",
                value: t("menus.loaded_items"),
                icon: FaTruckLoading,
                children: [],
              },
            ]
          : []),
        {
          path: "/sale",
          value: t("menus.sales"),
          icon: MdSell,
          children: [],
        },
        {
          path: "/returned-sales",
          value: t("menus.returned_sales"),
          icon: MdCancel,
          children: [],
        },
        {
          path: "#",
          value: t("menus.sales_report"),
          icon: MdReport,
          children: [
            {
              path: "/debtors",
              value: t("menus.debtors"),
              icon: BiMoney,
              children: [],
            },
            {
              path: "/total-sales",
              value: t("menus.total_sales"),
              icon: MdSell,
              children: [],
            },
          ],
        },
      ],
    },
  ];

  const Warehouse: SidebarType[] = [
    {
      path: "/warehouse",
      value: t("menus.warehouse"),
      icon: FaWarehouse,
      children: [],
    },
  ];

  const DollarRate: SidebarType[] = [
    ...(job_title === "Manager"
      ? [
          {
            path: "/dollar-rate",
            value: t("menus.dollar_rate"),
            icon: BiDollar,
            children: [],
          },
        ]
      : []),
  ];

  const Clients: SidebarType[] = [
    {
      path: "/clients-list",
      value: t("menus.clients_list"),
      icon: MdPerson,
      children: [],
    },
  ];

  const Purchases: SidebarType[] = [
    ...(job_title === "Manager"
      ? [
          {
            path: "#",
            value: t("menus.purchases"),
            icon: BiPurchaseTag,
            children: [
              {
                path: "/purchase-order",
                value: t("menus.purchase_order"),
                icon: BiPurchaseTag,
                children: [],
              },
              {
                path: "/items-on-way",
                value: t("menus.items_on_way"),
                icon: FaProductHunt,
                children: [],
              },
            ],
          },
        ]
      : []),
  ];

  const Menus: SidebarType[][] = [
    Main,
    Sales,
    Warehouse,
    DollarRate,
    Clients,
    Purchases,
  ];

  // Recursive SidebarItem component
  const SidebarItem = ({
    item,
    isChild,
  }: {
    item: SidebarType;
    isChild: boolean;
  }) => {
    const { colorMode } = useColorMode();
    const navigate = useNavigate();
    const location = useLocation();
    const hasChildren = item.children.length > 0;
    const itemPath = item.path;

    const handleClick = () => {
      if (!hasChildren || itemPath !== "#") {
        navigate(item.path);
      }
    };

    return (
      <Accordion allowToggle>
        <AccordionItem border="none">
          <AccordionButton
            onClick={handleClick}
            display="flex"
            alignItems="center"
            // p="2"
            m="1"
            borderRadius="lg"
            cursor="pointer"
            position="relative"
            role="group"
            transition="all 0.2s ease-in-out"
            bgColor={
              location.pathname === item.path
                ? colorMode === "light"
                  ? isChild
                    ? "gray.300"
                    : "gray.200"
                  : isChild
                  ? "gray.800"
                  : "gray.600"
                : isChild
                ? colorMode === "light"
                  ? "gray.100"
                  : "gray.700"
                : ""
            }
            _hover={{
              bg: colorMode === "light" ? "gray.200" : "gray.600",
              transform: "translateX(4px)",
            }}
            _active={{
              bg: colorMode === "light" ? "gray.200" : "gray.600",
              transform: "scale(0.98)",
            }}
          >
            {/* Icon with background */}
            <Center
              p="2"
              borderRadius="md"
              bg={colorMode === "light" ? "gray.100" : "gray.600"}
              color={colorMode === "light" ? "blue.500" : "blue.200"}
              transition="all 0.2s"
              _groupHover={{
                bg: colorMode === "light" ? "blue.50" : "blue.900",
                color: colorMode === "light" ? "blue.600" : "blue.300",
              }}
            >
              <item.icon fontSize="xl" />
            </Center>

            {/* Text */}
            <Text
              flex="1"
              fontSize="sm"
              fontWeight="medium"
              transition="all 0.2s"
              _groupHover={{
                color: colorMode === "light" ? "blue.700" : "blue.200",
              }}
            >
              {item.value}
            </Text>

            {/* Accordion arrow */}
            {hasChildren && (
              <Box as="span" transition="transform 0.2s">
                <ChevronDownIcon />
              </Box>
            )}
          </AccordionButton>

          {/* Render children if they exist */}
          {hasChildren && (
            <AccordionPanel>
              {item.children.map((child, index) => (
                <SidebarItem isChild={true} key={index} item={child} />
              ))}
            </AccordionPanel>
          )}
        </AccordionItem>
      </Accordion>
    );
  };

  return (
    <Box>
      {Menus.map((menuGroup, index) => (
        <Box key={index} mb="4">
          {menuGroup.map((item, idx) => (
            <SidebarItem isChild={false} key={idx} item={item} />
          ))}
        </Box>
      ))}
    </Box>
  );
}
