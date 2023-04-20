import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "./NewDeliveryTiming.module.css";
import { AiOutlineFieldTime } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";

// 11 AM - 01 PM (before 10 am)
// 03 PM - 05 PM (before 2 pm)
// 07 PM - 09 PM (before 6 pm)

const TIMINGS = [
  // {
  //   id: 1,
  //   name: "slot 1",
  //   starts: 11,
  //   end: 13,
  //   title: "11AM - 01PM",
  //   desc: "Sunrise Delivery",
  //   delay: 1,
  // },
  {
    id: 2,
    name: "slot 2",
    starts: 14,
    end: 16,
    title: "02PM - 04PM",
    desc: "Afternoon Delivery",
    delay: 1,
  },
  {
    id: 3,
    name: "slot 3",
    starts: 19,
    end: 21,
    title: "07PM - 09PM",
    desc: "Sunset Delivery",
    delay: 1,
  },
];

export const NewDeliveryTiming = ({ setDeliveryTiming }) => {
  const [selectedSlot, setSelectedSlot] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date] = useState(new Date());
  const DELIVERY_SLOT_TIMING = 16;

  const toady = date;
  // const dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    setDeliveryTiming({
      day: selectedDate,
      timingSlot: selectedSlot?.title,
    });
  }, [selectedDate, selectedSlot]);

  useEffect(() => {
    selectedDate.getHours() > DELIVERY_SLOT_TIMING &&
      setSelectedDate(
        new Date(
          new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0)
        )
      );
  }, []);

  useEffect(() => {
    setSelectedSlot(TIMINGS.at(-1));
  }, [selectedDate]);

  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  return (
    <>
      <div className="card border-0 osahan-accor rounded overflow-hidden mt-3">
        <div className="card-header bg-white border-0 p-0" id="headingthree">
          <h2 className="mb-0">
            <button
              className="btn d-flex align-items-center bg-white btn-block text-left btn-lg h5 px-3 py-4 m-0"
              type="button"
              data-toggle="collapse"
              data-target="#collapsethree"
              aria-expanded="true"
              aria-controls="collapsethree"
            >
              <span className="c-number">3</span> Delivery Time
            </button>
          </h2>
        </div>
        <div
          id="collapsethree"
          className="collapse"
          aria-labelledby="headingthree"
          data-parent="#accordionExample"
        >
          <div className="card-body p-0 border-top">
            <div className="osahan-order_address">
              <div className="text-center mb-4 py-4">
                <p className="display-2">
                  <i className="icofont-ui-calendar text-success" />
                </p>
                <p className="mb-1">Your Current Slot:</p>
                <h6 className="font-weight-bold text-dark">
                  {new Date().getDate() !== selectedDate.getDate()
                    ? "Tommorow"
                    : "Today"}
                  , {selectedSlot?.title}
                </h6>
              </div>
              <div className="schedule">
                <ul
                  className="nav nav-tabs justify-content-center nav-fill"
                  id="myTab"
                  role="tablist"
                >
                  {date.getHours() > DELIVERY_SLOT_TIMING ? (
                    <li
                      onClick={() =>
                        setSelectedDate(
                          new Date(
                            new Date(
                              new Date().setDate(new Date().getDate() + 1)
                            ).setHours(0)
                          )
                        )
                      }
                      className="nav-item"
                      role="presentation"
                    >
                      <a
                        className="nav-link text-dark"
                        id="tue-tab"
                        data-toggle="tab"
                        href="#tue"
                        role="tab"
                        aria-controls="tue"
                        aria-selected="false"
                      >
                        {/* <p className="mb-0 font-weight-bold">{dayName[getTomorrow().getDay()]}</p> */}
                        <p className="mb-0 font-weight-bold">Tomorrow</p>
                        <p className="mb-0">
                          {getTomorrow().getDate()}{" "}
                          {monthNames[getTomorrow().getMonth()].substring(0, 3)}
                        </p>
                      </a>
                    </li>
                  ) : (
                    <>
                      <li
                        onClick={() => setSelectedDate(new Date())}
                        className="nav-item"
                        role="presentation"
                      >
                        <a
                          className="nav-link active text-dark"
                          id="mon-tab"
                          data-toggle="tab"
                          href="#mon"
                          role="tab"
                          aria-controls="mon"
                          aria-selected="true"
                        >
                          {/* <p className="mb-0 font-weight-bold">{dayName[toady.getDay()]}</p> */}
                          <p className="mb-0 font-weight-bold">Today</p>
                          <p className="mb-0">
                            {toady.getDate()}{" "}
                            {monthNames[toady.getMonth()].substring(0, 3)}
                          </p>
                        </a>
                      </li>
                      <li
                        onClick={() =>
                          setSelectedDate(
                            new Date(
                              new Date(
                                new Date().setDate(new Date().getDate() + 1)
                              ).setHours(0)
                            )
                          )
                        }
                        className="nav-item"
                        role="presentation"
                      >
                        <a
                          className="nav-link text-dark"
                          id="tue-tab"
                          data-toggle="tab"
                          href="#tue"
                          role="tab"
                          aria-controls="tue"
                          aria-selected="false"
                        >
                          {/* <p className="mb-0 font-weight-bold">{dayName[getTomorrow().getDay()]}</p> */}
                          <p className="mb-0 font-weight-bold">Tomorrow</p>
                          <p className="mb-0">
                            {getTomorrow().getDate()}{" "}
                            {monthNames[getTomorrow().getMonth()].substring(
                              0,
                              3
                            )}
                          </p>
                        </a>
                      </li>
                    </>
                  )}
                </ul>
                {/* <div className="tab-content filter bg-white" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="mon"
                    role="tabpanel"
                    aria-labelledby="mon-tab"
                  >
                    <div
                      onClick={() => setTimingSlot("2PM - 4PM")}
                      className={
                        selectedDate.getHours() > 12
                          ? "custom-control border-bottom px-0 custom-radio inactive"
                          : "custom-control border-bottom px-0 custom-radio"
                      }
                    >
                      <input
                        className="custom-control-input"
                        type="radio"
                        name="exampleRadios"
                        id="mon1"
                        defaultValue="mon1"
                        defaultChecked={
                          selectedDate.getHours() > 12 ? false : true
                        }
                      />
                      <label
                        className="custom-control-label py-3 w-100 px-3"
                        htmlFor="mon1"
                      >
                        <i className="icofont-clock-time mr-2" /> 2PM - 4PM{" "}
                        <span style={{ fontSize: 10, marginLeft: 5 }}>
                          (Afternoon Delivery)
                        </span>
                      </label>
                    </div>
                    <div
                      onClick={() => setTimingSlot("6PM - 8PM")}
                      className={
                        selectedDate.getHours() > DELIVERY_SLOT_TIMING
                          ? "custom-control border-bottom px-0 custom-radio inactive"
                          : "custom-control border-bottom px-0 custom-radio"
                      }
                    >
                      <input
                        className="custom-control-input"
                        type="radio"
                        name="exampleRadios"
                        id="mon2"
                        defaultValue="mon2"
                        defaultChecked={
                          selectedDate.getHours() > DELIVERY_SLOT_TIMING
                            ? false
                            : true
                        }
                      />
                      <label
                        className="custom-control-label py-3 w-100 px-3"
                        htmlFor="mon2"
                      >
                        <i className="icofont-clock-time mr-2" /> 6PM - 8PM{" "}
                        <span style={{ fontSize: 10, marginLeft: 5 }}>
                          (Sunset Delivery)
                        </span>
                      </label>
                    </div>
                  </div>
                </div> */}
                <Box>
                  <Stack>
                    {TIMINGS.map((slot, i) => {
                      return (
                        <Flex
                          key={i}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          px={4}
                          py={4}
                          borderBottom={"1px solid #d4d4d4"}
                          mt={"unset !important"}
                          //   className={styles.slotDisabled}
                          className={
                            slot.id === selectedSlot?.id
                              ? styles.slotSelected
                              : selectedDate.getHours() + 1 + slot.delay >
                                slot.starts
                              ? styles.slotDisabled
                              : ""
                          }
                          onClick={() => {
                            setSelectedSlot(slot);
                          }}
                        >
                          <Text>
                            <AiOutlineFieldTime
                              size={20}
                              style={{ marginRight: 6 }}
                            />
                            {slot.title} <Text as={"span"}>({slot.desc})</Text>
                          </Text>
                          {slot.id === selectedSlot?.id && (
                            <Box mr={5}>
                              <GiCheckMark />
                            </Box>
                          )}
                        </Flex>
                      );
                    })}
                  </Stack>
                </Box>
              </div>
            </div>
            {selectedDate.getHours() > DELIVERY_SLOT_TIMING && (
              <Box p={3}>
                <Alert status="warning" borderRadius={8}>
                  <AlertIcon />
                  Delivery will be given the next day (2PM - 4PM )
                </Alert>
                <Alert status="warning" borderRadius={8} mt={2}>
                  <AlertIcon />
                  डिलीवरी अगले दिन (2PM - 4PM ) तक की जाएगी
                </Alert>
              </Box>
            )}
            <div className="p-3">
              <a
                href="#"
                className="btn btn-success btn-lg btn-block"
                type="button"
                data-toggle="collapse"
                data-target="#collapsefour"
                aria-expanded="true"
                aria-controls="collapsefour"
              >
                Schedule Order
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewDeliveryTiming;
