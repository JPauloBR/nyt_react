import React from "react";
import PropTypes from 'prop-types';

const Modal = ({ children }) =>

<div className="modal fade" id="modal-buy-confirm" tabIndex="-1" role="dialog">
    <div className="modal-dialog modal-sm">
        <div className="modal-content text-center">
            <h3>Article Saved</h3>
            <i className="fa fa-check fa-4x text-success"></i>
        </div>
    </div>
</div>

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;


