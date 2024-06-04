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
                    <th scope="col">{t("index.commun-number")}</th>
                    <th scope="col">{t("index.commun-perc")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Roberto Díaz</th>
                    <td>520</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Angelina Rodriguez</th>
                    <td>500</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Alberto Saez</th>
                    <td>407</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Carla Sainz</th>
                    <td>338</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Rodriga Toledo</th>
                    <td>263</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
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
