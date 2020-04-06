import React, { useState } from 'react';
import './App.css';
import { Card, Col, Tag, Row, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload as any;




function App() {
  const [noOfWords, setNoOfWords] = useState(0);
  const [noOfLetters, setNoOfLetters] = useState(0);
  const [noOfSymbols, setNoOfSymbols] = useState(0);
  const [topWords, setTopWords] = useState(0);
  const [topLetters, setTopLetters] = useState(0);

  const props = {
    name: 'textFile',
    multiple: false,
    action: 'http://localhost:8005/upload',
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        console.log(info, info.fileList);
        let data = info.file.response.data;
        setNoOfWords(data.noOfWords);
        setNoOfLetters(data.noOfLetters);
        setNoOfSymbols(data.noOfSymbols);
        setTopWords(data.topWords);
        setTopLetters(data.topLetters);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div className="App">

      <Row style={{ padding: '5px' }}>
        <Col span={8}>
        </Col>
        <Col span={8}>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Upload text file to get stats
    </p>
          </Dragger>
        </Col>
        <Col span={8}>
        </Col>
      </Row>
      <Row style={{ margin: '50px' }}>
        <Col span={8}>
        </Col>
        <Col span={8}>
          <div className="site-card-border-less-wrapper">
            <Card title="Text Stats" bordered={true} style={{ width: 500, padding: '10px' }}>
              <Row style={{ padding: '5px' }}>
                <Tag>Total Words::: {noOfWords}</Tag>
              </Row>
              <Row style={{ padding: '5px' }}>
                <Tag>Total Letters::: {noOfLetters}</Tag>
              </Row>
              <Row style={{ padding: '5px' }}>
                <Tag>Total Symbols::: {noOfSymbols}</Tag>
              </Row>
              <Row style={{ padding: '5px' }}>
                <Tag>Three Most Common Words::: {topWords}</Tag>
              </Row>
              <Row style={{ padding: '5px' }}>
                <Tag>Three Most Common Letters::: {topLetters}</Tag>
              </Row>
            </Card>
          </div>
        </Col>
        <Col span={8}>
        </Col>
      </Row>

    </div>
  );
}

export default App;
