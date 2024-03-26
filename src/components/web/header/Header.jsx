import React from "react";
import style from "./header.module.css";
import { Link, useNavigate} from 'react-router-dom'
import { CiLogin } from "react-icons/ci";


export default function Header() {
  return (
    <div>
      <div className="px-4 py-5 my-5 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="160"
          height="160"
          fill="currentColor"
          class="bi bi-bag-dash-fill"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M6 9.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z"
          />
        </svg>
        <h1 className="display-5 fw-bold text-body-emphasis">Adhami Shop</h1>
        <div className="col-lg-6 mx-auto">
          <h1 className="lead mb-4">
            Quickly design and customize responsive mobile-first sites with
            Bootstrap, the world’s most popular front-end open source toolkit,
            featuring Sass variables and mixins, responsive grid system,
            extensive prebuilt components, and powerful JavaScript plugins.
          </h1>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" className="btn btn-primary btn-lg px-4 gap-3" >
            <Link to='/register' className="dropdown-item" >Register</Link>            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
            >
            <Link to='/login' className="dropdown-item" > <CiLogin/> Login</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
