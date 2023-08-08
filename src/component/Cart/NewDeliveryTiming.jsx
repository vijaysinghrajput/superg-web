import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Image,
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

// 11 AM - 02 PM
// 02 PM - 05 PM
// 04 PM - 07 PM
// 07 PM - 10 PM

const TIMINGS = [
  {
    id: 1,
    name: "slot 1",
    starts: 11,
    end: 14,
    title: "11AM - 02PM",
    desc: "Sunrise Delivery",
    delay: 1,
  },
  {
    id: 2,
    name: "slot 2",
    starts: 14,
    end: 17,
    title: "02PM - 05PM",
    desc: "Noon Delivery",
    delay: 1,
  },
  {
    id: 3,
    name: "slot 3",
    starts: 16,
    end: 19,
    title: "04PM - 07PM",
    desc: "Afternoon Delivery",
    delay: 1,
  },
  // {
  //   id: 4,
  //   name: "slot 4",
  //   starts: 17,
  //   end: 19,
  //   title: "05PM - 07PM",
  //   desc: "Sunset Delivery",
  //   delay: 1,
  // },
  {
    id: 5,
    name: "slot 5",
    starts: 19,
    end: 22,
    title: "07PM - 10PM",
    desc: "Evening Delivery",
    delay: 1,
  },
];

export const NewDeliveryTiming = ({ setDeliveryTiming }) => {
  const [selectedSlot, setSelectedSlot] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date] = useState(new Date());
  const DELIVERY_SLOT_TIMING = 17;

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
                          {slot.id === selectedSlot?.id ? (
                            <Box mr={5}>
                              <GiCheckMark />
                            </Box>
                          ) : (
                            selectedDate.getHours() + 1 + slot.delay >
                              slot.starts && (
                              <Image
                                src="data:image/png;base64,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"
                                height={8}
                              />
                            )
                          )}
                        </Flex>
                      );
                    })}
                  </Stack>
                </Box>
              </div>
            </div>
            {date.getHours() > DELIVERY_SLOT_TIMING && (
              <Box p={3}>
                <Alert status="warning" borderRadius={8}>
                  <AlertIcon />
                  Delivery will be given the next day ({selectedSlot?.title})
                </Alert>
                <Alert status="warning" borderRadius={8} mt={2}>
                  <AlertIcon />
                  डिलीवरी अगले दिन ({selectedSlot?.title}) तक की जाएगी
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
