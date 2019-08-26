import React from 'react';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import { dccaData, DCCAData } from './data/Data';
import { ReduxState } from './Types';

type StateProps = {
  dccaData: DCCAData | null;
}

type OwnProps = {
}

type DispatchProps = {
}

type Props = StateProps & OwnProps & DispatchProps;

const DCCAPanel: React.FunctionComponent<Props> = (props) => {
  if (props.dccaData) {
    return (
      <Card>
        <Card.Header>{props.dccaData.CACODE} - {props.dccaData.CNAME} {props.dccaData.ENAME}</Card.Header>
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
    dccaData: !state.page || !state.dcca ? null : dccaData[state.page][state.dcca],
  };
};

const ConnectedDCCAPanel = connect(mapStateToProps)(DCCAPanel);
export default ConnectedDCCAPanel;
