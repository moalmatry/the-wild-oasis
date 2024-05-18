import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useCabins } from "../cabins/useCabins";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isLoading: isLoadingOne } = useRecentBookings();
  const {
    // stays,
    confirmedStays,
    isLoading: isLoadingTwo,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoadingThree } = useCabins();

  if (isLoadingOne || isLoadingTwo || isLoadingThree) return <Spinner />;
  // console.log(bookings);
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        numDays={numDays}
        cabinCount={cabins.length}
        confirmedStays={confirmedStays}
      />
      {/* <div>Today's activity</div> */}
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
