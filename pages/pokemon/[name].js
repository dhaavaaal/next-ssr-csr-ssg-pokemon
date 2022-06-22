import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";

const getPokemon = async (key, name) => {
  const { data } = await axios.get(`/api/pokemon?name=${name}`);
  // const { data } = await axios.get(`/api/search`);
  //   console.log(data);
  return data;
  //   return {
  //     ...data,
  //     image: `/pokemon/${data.name.english.toLowerCase().replace(" ", "-")}.jpg`,
  //   };
};

const pokemon = () => {
  const router = useRouter();
  const { data } = useQuery(
    ["name", router.query.name],
    getPokemon.bind(null, "1", router.query.name)
  );
  console.log("Data", data);
  return (
    <div>
      <Head>
        <title>{(data && data.name.english) || "Pokemon"}</title>
      </Head>
      <Container>
        {data && (
          <>
            <h1>{data.name.english}</h1>
            <Row>
              <Col xs={4}>
                <img
                  alt=""
                  src={`/pokemon/${data.name.english
                    .toLowerCase()
                    .replace(" ", "-")}.jpg`}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col xs={8}>
                {Object.entries(data.base).map(([key, value]) => (
                  <Row key={key}>
                    <Col xs={2}>{key}</Col>
                    <Col xs={10}>{value}</Col>
                  </Row>
                ))}
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

// const pokemon = () => {
//   const router = useRouter();
//   return <div>{router.query.name}</div>;
// };
export default pokemon;
