import React from "react"
import PropTypes from "prop-types"
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from "react-icons/fa"

const RepoGrid = ({repos}) => {
    return (
        <ul className="repo-grid">
            {repos.map((repo, id) => {
                return (
                    <li key={id} className="repo-grid__item">
                        <p>#{id+1}</p>
                        <img src={repo.owner.avatar_url} alt="Repo" className="repo-grid__item--logo" />
                        <p className="repo-grid__item--headline-text">{repo.name}</p>
                        <div className="repo-grid__item--desc">
                            <p><FaUser color="rgb(255, 191, 116)" size={22}/> {repo.name}</p>
                            <p><FaStar color="rgb(255, 215, 0)" size={22}/> {repo.stargazers_count} stars</p>
                            <p><FaCodeBranch color="rgb(129, 195, 245)" size={22}/> {repo.forks_count} forks</p>
                            <p><FaExclamationTriangle color="rgb(241, 138, 147)" size={22}/> {repo.open_issues_count} open issues</p>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

export default RepoGrid