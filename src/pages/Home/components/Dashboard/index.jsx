import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Badge, Card, Col, Row} from 'antd';
import {CheckCircleOutlined, FieldTimeOutlined, ProfileOutlined, UserOutlined} from '@ant-design/icons';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  ResponsiveContainer,
} from 'recharts';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setBreadcrumb} from '@/states/modules/app';
import {requestGetInfoDashboard} from '@/api/home';
const Dashboard = () => {
  //   State cần
  const dispatch = useDispatch();
  const listDashboard = useSelector((state) => state.home.listDashboard);

  useEffect(() => {
    document.title = 'SV.Doc - Tổng quan';
  }, []);

  useEffect(() => {
    document.title = 'SV.Doc - Tài khoản';
    let dataBreadcrumb = [
      {
        path: '/',
        name: 'Trang chủ',
      },
      {
        path: '/',
        name: 'Tổng quan',
      },
    ];
    dispatch(setBreadcrumb(dataBreadcrumb));
    dispatch(requestGetInfoDashboard());
    return () => dispatch(setBreadcrumb([]));
  }, []);
  const colors = ['#8433e0', '#ffc400', '#062b51', '#1d538b', '#e4302a'];
  const data = [
    {
      name: 'Người dùng',
      'Số lượng': listDashboard.total_teacher + listDashboard.total_student + listDashboard.total_other,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Thể loại',
      'Số lượng': listDashboard.total_category,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Tài liệu duyệt',
      'Số lượng': listDashboard.total_doc_checked,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Tài liệu chờ',
      'Số lượng': listDashboard.total_doc_pending,
      pv: 3908,
      amt: 2000,
    },

    {
      name: 'Tài liệu khóa',
      'Số lượng': listDashboard.total_lock,
      pv: 3908,
      amt: 2000,
    },
  ];

  //Tron User
  const dataPieUser = [
    {name: 'Giáo viên', value: listDashboard.total_teacher},
    {name: 'Sinh viên', value: listDashboard.total_student},
    {name: 'Người dùng khác', value: listDashboard.total_other},
  ];

  const COLORSUSER = ['#7f4f14', '#c27d29', '#eeac5c'];

  const RADIANUSER = Math.PI / 180;
  const renderCustomizedLabelUser = ({cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIANUSER);
    const y = cy + radius * Math.sin(-midAngle * RADIANUSER);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  //Tron
  const dataPie = [
    {name: 'Tài liệu đã duyệt', value: listDashboard.total_doc_checked},
    {name: 'Tài liệu chờ duyệt', value: listDashboard.total_doc_pending},
    {name: 'Tài liệu khóa', value: listDashboard.total_lock},
  ];

  const COLORS = ['#062b51', '#1d538b', '#4e8ac9'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
    
      <div className={`${styles.dashboardContainer}`}>
        <div className={styles.overViewWrap}>
          <div className={styles.totalWrap}>
            <Row
              gutter={{
                xs: [10, 10],
                sm: 10,
                md: 16,
                lg: 20,
              }}
            >
              <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                <Link to="/users">
                  <Card className={`${styles.widgetFlat} ${styles.bgPrimary}`}>
                    <div className="">
                      <div className={`${styles.widgetIcon}`}>
                        <UserOutlined />
                      </div>
                      <h6 className={styles.title}>Tổng admin</h6>
                      <h2 className={styles.subTitle}>{listDashboard.total_admin}</h2>
                    </div>
                  </Card>
                </Link>
              </Col>
              <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                <Link to="/createCategory">
                  <Card className={`${styles.widgetFlat} ${styles.bgPrimary}`}>
                    <div className="">
                      <div className={`${styles.widgetIcon}`}>
                        <ProfileOutlined />
                      </div>
                      <h6 className={styles.title}>Tổng số thể loại</h6>
                      <h2 className={styles.subTitle}>{listDashboard.total_category}</h2>
                    </div>
                  </Card>
                </Link>
              </Col>
              <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                <Link to="/checkedPostAdmin">
                  <Card className={`${styles.widgetFlat} ${styles.bgPrimary}`}>
                    <div className="">
                      <div className={`${styles.widgetIcon}`}>
                        <CheckCircleOutlined />
                      </div>
                      <h6 className={styles.title}>Tổng tài liệu duyệt</h6>
                      <h2 className={styles.subTitle}>{listDashboard.total_doc_checked}</h2>
                    </div>
                  </Card>
                </Link>
              </Col>
              <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                <Link to="/pendingPostAdmin">
                  <Card className={`${styles.widgetFlat} ${styles.bgPrimary}`}>
                    <div className="">
                      <div className={`${styles.widgetIcon}`}>
                        <FieldTimeOutlined />
                      </div>
                      <h6 className={styles.title}>Tổng tài liệu chờ</h6>
                      <h2 className={styles.subTitle}>{listDashboard.total_doc_pending}</h2>
                    </div>
                  </Card>
                </Link>
              </Col>
            </Row>
          </div>

          <div className={styles.charWrap}>
            <Row gutter={20}>
              <Col span={12}>
                <div className={styles.barChartWrap}>
                  <ResponsiveContainer width="95%" height={400}>
                    <BarChart className={styles.barChart} data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="Số lượng" fill="#8884d8" label={{position: 'top'}}>
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className={styles.textName}>
                    <span> Biều đồ thống kê tổng quan</span>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className={styles.barChartPieUserWrap}>
                  <div className={styles.pieChartCenter}>
                    <PieChart width={400} height={400}>
                      <Tooltip />
                      <Pie
                        data={dataPieUser}
                        labelLine={false}
                        label={renderCustomizedLabelUser}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {dataPieUser?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORSUSER[index % COLORSUSER.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </div>
                  <div className={styles.namePie}>
                    <span className={styles.textName}> Biều đồ thống kế người dùng</span>
                  </div>
                  <div className="">
                    <Badge color="#804f14" text="Giáo viên" />
                  </div>
                  <div>
                    <Badge color="#c17d28" text="Sinh viên" />
                  </div>
                  <div>
                    <Badge color="#efac5d" text="Người dùng khác" />
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className={styles.barChartPieWrap}>
                  <div className={styles.pieChartCenter}>
                    <PieChart width={400} height={400}>
                      <Tooltip />
                      <Pie
                        data={dataPie}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {dataPie.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </div>
                  <div className={styles.namePie}>
                    <span className={styles.textName}> Biều đồ thống kế tài liệu</span>
                  </div>

                  <div className="">
                    <Badge color="#052b50" text="Tài liệu đã duyệt" />
                  </div>
                  <div>
                    <Badge color="#1c538b" text="Tài liệu chờ duyệt" />
                  </div>
                  <div>
                    <Badge color="#4e8ac9" text="Tài liệu khóa" />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
