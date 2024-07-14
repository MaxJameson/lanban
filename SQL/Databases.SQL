
CREATE TABLE IF NOT EXISTS `tbltasks` (
    `taskID` int(11) NOT NULL AUTO_INCREMENT,
    `Name` longtext DEFAULT NULL,
    `details` longtext DEFAULT NULL,
    `state` int(11) DEFAULT NULL,
    `created` date DEFAULT NULL,
    PRIMARY KEY (`taskID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;