import Chart from "chart.js";
import {
  Card,
  CardHeader,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";

import { useTranslation } from "react-i18next";
import Header from "components/Headers/Header.js";
import React, { useEffect, useState } from 'react';

const Index = (props) => {
  const { t } = useTranslation("global");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const [visitors, setVisitors] = useState([]);
  const [frequentVisits, setFrequentVisits] = useState([]);

  useEffect(() => {
    fetch('https://edipanelvercel.vercel.app/api/getvisitors')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setVisitors(data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  // alamacenar los datos  de FrequentVisits
  useEffect(() => {
    fetch('https://edipanelvercel.vercel.app/api/getfrequentvisits')
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
        
        setFrequentVisits(data);
        console.log(data);
        
        })
        .catch(error => {
        console.error('There was an error!', error);
        });
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">{t("index.visits")}</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">{t("index.visits-title1")}</th>
                    <th scope="col">{t("index.visits-title2")}</th>
                    <th scope="col">{t("index.visits-title3")}</th>
                    <th scope="col">{t("index.visits-title4")}</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.sort((a, b) => b.id - a.id).slice(0, 10).map((visitor, index) => (
                    <tr key={index}>
                        <th scope="row">{visitor.name}</th>
                        <td>{visitor.building}</td>
                        <td>{visitor.apartment}</td>
                        <td>{visitor.time.toString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">{t("index.commun")}</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">{t("index.commun-title")}</th>
                    <th scope="col">{t("index.visits-title2")}</th>
                    <th scope="col">{t("index.visits-title3")}</th>
                  </tr>
                </thead>
                <tbody>
                {frequentVisits.map((frequentvisit, index) => (
                    <tr key={index}>
                        <td>{frequentvisit.name}</td>
                        <td>{frequentvisit.building}</td>
                        <td>{frequentvisit.apartment}</td>
                    </tr>
                ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
