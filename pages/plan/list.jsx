import { useState, useEffect, useContext } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

import useSWR from "swr";
import { PeopleOutline } from "@mui/icons-material";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import {
  Grid,
  Link,
  Button,
  Chip,
  CircularProgress,
  Box,
  Avatar,
} from "@mui/material";

import CardNumber from "../../components/ui/cardNumber";
import axiosApi from "../../axios/axiosApi";

import LockResetIcon from "@mui/icons-material/LockReset";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

import { planSearchAll } from "../../handlers/plan";

import { AdminLayout } from "../../components/layouts/AdminLayout";
import ClientSearchByText from "../../components/forms/clientSearchByText";
import { Typography } from "antd";
import { showToast, toastWarning } from "../../components/ui";

import ClientUpdateDomain from "../../components/forms/clientUpdateDomain";
import ClientUpdateTag from "../../components/forms/clientUpdateTag";
import { AuthContext } from "../../context/auth";

import { API_ROUTER } from "../../config";
import { result } from "lodash";

const softwareFormat = (valors) => {
  switch (valors.active) {
    case true:
      return (
        <Chip
          variant="outlined"
          size="small"
          label={valors.software}
          color="success"
        />
      );
      break;

    case false:
      return (
        <Chip
          variant="outlined"
          size="small"
          label={valors.software}
          color="error"
        />
      );
      break;

    default:
      break;
  }
};

const PlanList = () => {
  const [datas, setDatas] = useState([]);
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingSearch, setLoadingSearch] = useState(false);
  const [isSearch, setSearch] = useState(false);

  const initialData = async () => {
    const { plans, ok } = await planSearchAll();

    if (ok) {
      setDatas(
        plans.map((plan) => ({
          departureDate: plan.departureDate,
          departureTime: plan.departureTime,
          maxLimit: plan.maxLimit,
          name: plan.name,
          packId: plan.packId,
          price: plan.price,
          serial: plan.serial,
          status: plan.status,
          totalApps: plan.totalApps,
          packName: plan.packId.name,
          guideName: plan?.guideId?.firstname,
          id: plan._id,
        }))
      );

      return plans;
    }
  };

  const columns = [
    {
      field: "totalApps",
      headerName: "Apps",
      width: 80,
      renderCell: ({ row }) => {
        return <Typography>{row.totalApps} </Typography>;
      },
    },
    {
      field: "packName",
      headerName: "Paquete",
      width: 200,
      renderCell: ({ row }) => {
        return (
          <NextLink href={`/appsByPlan/${row.id}`} passHref>
            <Link underline="always">
              <Typography>{row.packName} </Typography>
            </Link>
          </NextLink>
        );
      },
    },
    {
      field: "departureDate",
      headerName: "Fecha",
      width: 120,
      renderCell: ({ row }) => {
        return <Typography>{row.departureDate} </Typography>;
      },
    },
    {
      field: "departureTime",
      headerName: "Hora",
      width: 80,
      renderCell: ({ row }) => {
        return <Typography>{row.departureTime} </Typography>;
      },
    },
    {
      field: "guideId",
      headerName: "Guía",
      width: 120,
      renderCell: ({ row }) => {
        return <Typography>{row.guideName} </Typography>;
      },
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    initialData();
  }, []);

  //const planss = API_ROUTER.PLAN.getPlanInstance;
  // const fetcher = async (url) =>
  //await axiosApi.get(url).then((res) => res.data);
  // const { data, error } = useSWR(planss, fetcher);

  return (
    <AdminLayout
      title={"Usuarios"}
      subTitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}
    >
      <Box className="card">
        {/* 
        <Grid container className="fadeIn">
          <Grid item xs={6} md={2}>
            <Link onClick={() => openDetails(true)}>
              <CardNumber
                title={data?.yes || 0}
                subtitle="Con mantenimiento"
                clase="successGradient pointer"
              />
            </Link>
          </Grid>

          <Grid item xs={6} md={2}>
            <Link onClick={() => openDetails(false)}>
              <CardNumber
                title={data?.no || 0}
                subtitle="Sin Mantenimento"
                clase="errorGradient pointer"
              />
            </Link>
          </Grid>

          <Grid item xs={6} md={2}>
            <Link onClick={() => initialData()}>
              <CardNumber
                title={data?.yes + data?.no || 0}
                subtitle="Todos"
                clase="infoGradient pointer"
              />
            </Link>
          </Grid>

          <Grid item xs={6} md={2}>
            <Link onClick={() => setSearch(!isSearch)}>
              <CardNumber
                title={!isSearch ? "+" : "-"}
                subtitle="Filtros"
                clase="defaultGradient pointer"
              />
            </Link>
          </Grid>
        </Grid>
  */}
        <Grid container className="fadeIn">
          {datas.length > 0 ? (
            <Grid item xs={12} sx={{ height: 1000, width: "100%" }}>
              {!isLoading ? (
                <DataGrid
                  rows={datas}
                  columns={columns}
                  pageSize={30}
                  rowsPerPageOptions={[30]}
                />
              ) : (
                <CircularProgress />
              )}
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ height: 50, width: "100%" }}>
              <CircularProgress />
            </Grid>
          )}
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default PlanList;
