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
    const selectedDccaInfo = props.districtInfo[props.selectedDcca];

    return (
      <Card>
        <Card.Header>{ selectedDccaInfo.CACODE } - { selectedDccaInfo.CNAME } { selectedDccaInfo.ENAME }</Card.Header>
        <Card.Body>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
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
