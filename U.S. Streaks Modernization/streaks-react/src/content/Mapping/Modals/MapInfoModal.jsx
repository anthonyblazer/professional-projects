import React from "react";
import { Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import "./MapInfoModal.css";

function MapInfoModal({ show, onHide}) {

    return (
        <Modal 
        show={show} 
        onHide={onHide}  
        centered 
        size="md" 
        scrollable 
        dialogClassName="modal-dialog" 
        id="mapping-note">
            <Modal.Header closeButton>
                <Modal.Title id="more-app-info" as="div">
                    <motion.h3
                    initial={{opacity: 0, y: -20 }}
                    animate={{opacity: 1, y: 0 }}
                    transition={{duration: 0.45 }}
                    >
                        Note
                    </motion.h3>
                </Modal.Title>
            </Modal.Header>

            {/** Modal Body */}
            <Modal.Body className="text-left">
                <motion.div
                initial="hidden"
                animate="show"
                variants={{hidden: {}, show: { transition: { staggerChildren: 0.2 }}}}>
                    <motion.p variants={{ hidden: { opacity: 0, x: -10 }, show: {opacity: 1, x: 0 } }}>
                        "All Time" longest streaks for the United States and Contiguous United States are not available 
                        for mapping.
                    </motion.p>
                    <motion.p variants={{ hidden: { opacity: 0, x: -10 }, show: {opacity: 1, x: 0 } }}>
                        United States all time data can be downloaded using the data links below the map after either 
                        plotting all time steaks for a parameter for any state or plotting streaks for the United States or 
                        Contiguous United States on a given date.
                    </motion.p>
                </motion.div>
            </Modal.Body>

            {/** Footer */}
            <Modal.Footer>
                <motion.button 
                type="button" 
                className="btn" 
                onClick={onHide}
                whileTap={{scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                transition={{ bounceDamping: 10, bounceStiffness: 600 }}
                >
                    Close
                </motion.button>
            </Modal.Footer>

        </Modal>
    )

}


export default MapInfoModal;

