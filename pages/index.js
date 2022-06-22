import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Card, Container, FormControl, Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";

const getPokemon = async (key, q) => {
  const { data } = await axios.get(`/api/search?q=${q}`);
  // const { data } = await axios.get(`/api/search`);
  console.log(data);
  // return data;
  return data.map((pokemon) => ({
    ...pokemon,
    image: `/pokemon/${pokemon.name.english
      .toLowerCase()
      .replace(" ", "-")}.jpg`,
  }));
};

export default function Home() {
  const [query, setQuery] = useState("");
  const { data } = useQuery(["q", query], getPokemon.bind(null, "1", query));
  console.log(data);
  return (
    <div className="container">
      <Head>
        <title>Pokemon!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <FormControl
          placeholder="Search"
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* <div>{JSON.stringify(data)}</div> */}
        {data && (
          <Row>
            {data.map(({ id, name, type, image }) => (
              <Col xs={4} key={id} style={{ padding: 5 }}>
                <Link href={`/pokemon/${name.english}`}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={image}
                      style={{ maxHeight: 300 }}
                    />
                    <Card.Body>
                      <Card.Title>{name.english}</Card.Title>
                      <Card.Subtitle>{type.join(", ")}</Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}
