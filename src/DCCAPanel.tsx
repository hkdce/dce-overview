import React from 'react';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import { DistrictInfo, ReduxState } from './Types';

type StateProps = {
  selectedDcca: string;
}

type OwnProps = {
  districtInfo: DistrictInfo;
}

type DispatchProps = {
}

type Props = StateProps & OwnProps & DispatchProps;

const DCCAPanel: React.FunctionComponent<Props> = (props) => {
  if (props.selectedDcca) {
    const dccaInfo = props.districtInfo.dccaList[props.selectedDcca];
    const candidates = props.districtInfo.candidates ? props.districtInfo.candidates[props.selectedDcca] : [];

    return (
      <Card>
        <Card.Header>{ dccaInfo.CACODE } - { dccaInfo.CNAME } { dccaInfo.ENAME }</Card.Header>
        <Card.Body>
          {
            candidates.map(c =>
            <div style={{ margin: "4px 0px 4px 0px" }}>
              <div>{ c.name } { c.yearOfBirth ? (new Date().getFullYear() - c.yearOfBirth) + "歲" : "年齡不詳" } { c.gender }</div>
              <div>[{ c.camp }] { c.politicalAffiliation ? c.politicalAffiliation : "政治聯繫不明" }</div>
              <div>{ c.isUncontested ? "自動當選" : "得票: " + c.votes + " " + (c.votePercentage * 100).toFixed(1) + "%" }</div>
            </div>)
          }
        </Card.Body>
      </Card>
    );
  } else {
    return null;
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    selectedDcca: state.dcca,
  };
};

const ConnectedDCCAPanel = connect(mapStateToProps)(DCCAPanel);
export default ConnectedDCCAPanel;
